const pool = require("../db/db");

const createAccount = async (req, res) => {
    const { name, lastname, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!name || !lastname || !email || !phoneNumber || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        const emailCheckQuery = 'SELECT id FROM account WHERE email = $1';
        const emailCheckResult = await pool.query(emailCheckQuery, [email]);

        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Insert the new account into the database
        const createAccountQuery = `
            INSERT INTO account (name, lastname, email, phoneNumber, password, createdAt)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING id, name, lastname, email, phoneNumber, createdAt;
        `;
        const result = await pool.query(createAccountQuery, [
            name,
            lastname,
            email,
            phoneNumber,
            password,
        ]);

        // Return the newly created account (excluding the password for security)
        const newAccount = result.rows[0];
        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const getAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        // Query the database to fetch account details
        const query = 'SELECT * FROM account WHERE id = $1';
        const result = await pool.query(query, [id]);

        // Check if the account exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const getAllAccounts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM account');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const updateAccountById = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, password, phoneNumber } = req.body; // Removed trailing comma

    try {
        // Update the account with all provided fields
        const result = await pool.query(
            'UPDATE account SET name = $1, lastname = $2, email = $3, password = $4, phoneNumber = $5 WHERE id = $6 RETURNING *',
            [name, lastname, email, password, phoneNumber, id]
        );

        // Check if the account was found and updated
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Return the updated account
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const deleteAccountById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}


module.exports = {
    getAccountById,
    getAllAccounts,
    updateAccountById,
    deleteAccountById,
    createAccount,
}