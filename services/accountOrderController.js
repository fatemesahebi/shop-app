const { IN_PROGRESS } = require("../configs/types");
const pool = require("../db/db");

const getAccountOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        // Query the database to fetch AccountOrder details
        const query = 'SELECT * FROM accountOrder WHERE id = $1';
        const result = await pool.query(query, [id]);

        // Check if the AccountOrder exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'AccountOrder not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const getAllAccountOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accountOrder');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const createAccountOrder = async (req, res) => {
    const { account, paymentMethod, discountCode, items } = req.body;

    // Validate required fields
    if (!account || !paymentMethod || !items || items.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await pool.connect(); // Get a client from the pool for transactions

    try {
        await client.query('BEGIN'); // Start a transaction

        // Step 1: Create the accountOrder entry
        const orderStatus = 'IN_PROGRESS'; // Default status
        const accountOrderQuery = `
            INSERT INTO accountOrder (account, paymentMethod, orderStatus, discountCode, createdAt)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING id;
        `;
        const accountOrderResult = await client.query(accountOrderQuery, [
            account,
            paymentMethod,
            orderStatus,
            discountCode || null, // Handle optional discountCode
        ]);

        const accountOrderId = accountOrderResult.rows[0].id; // Get the newly created accountOrder ID

        // Step 2: Create orderItem entries for each item in the items array
        for (let item of items) {
            const { product, quantity } = item;

            // Validate item fields
            if (!product || !quantity) {
                await client.query('ROLLBACK'); // Rollback the transaction if validation fails
                return res.status(400).json({ error: 'Invalid item data' });
            }

            const orderItemQuery = `
                INSERT INTO orderItem (account, accountOrder, product, quantity, createdAt)
                VALUES ($1, $2, $3, $4, NOW());
            `;
            await client.query(orderItemQuery, [account, accountOrderId, product, quantity]);
        }

        await client.query('COMMIT'); // Commit the transaction
        res.status(201).json({ message: 'Order created successfully', orderId: accountOrderId });
    } catch (err) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    } finally {
        client.release(); // Release the client back to the pool
    }
};

const updateAccountOrderStatusById = async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    try {
        const result = await pool.query(
            'UPDATE accountOrder SET orderStatus = $1 WHERE id = $2 RETURNING *',
            [orderStatus, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const deleteAccountOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM profuct WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}


module.exports = {
    getAccountOrderById,
    getAllAccountOrders,
    updateAccountOrderStatusById,
    deleteAccountOrderById,
    createAccountOrder,
}