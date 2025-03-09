const pool = require("../db/db");

const createDiscountCode = async (req, res) => {
    const { code, amount, expirationDate } = req.body;

    // Validate required fields
    if (!code || !amount || !expirationDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    // Validate expirationDate is a valid date
    if (isNaN(Date.parse(expirationDate))) {
        return res.status(400).json({ error: 'Invalid expiration date' });
    }

    try {
        // Check if the discount code already exists
        const codeCheckQuery = 'SELECT id FROM discountCode WHERE code = $1';
        const codeCheckResult = await pool.query(codeCheckQuery, [code]);

        if (codeCheckResult.rows.length > 0) {
            return res.status(400).json({ error: 'Discount code already exists' });
        }

        // Insert the discount code into the database
        const createDiscountCodeQuery = `
            INSERT INTO discountCode (code, amount, expirationDate, createdAt)
            VALUES ($1, $2, $3, NOW())
            RETURNING *;
        `;
        const result = await pool.query(createDiscountCodeQuery, [
            code,
            amount,
            expirationDate,
        ]);

        // Return the newly created discount code
        const newDiscountCode = result.rows[0];
        res.status(201).json({ message: 'Discount code created successfully', discountCode: newDiscountCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const getDiscountCodeById = async (req, res) => {
    const { id } = req.params;
    try {
        // Query the database to fetch DiscountCode details
        const query = 'SELECT * FROM discountCode WHERE id = $1';
        const result = await pool.query(query, [id]);

        // Check if the DiscountCode exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'discountCode not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const getAllDiscountCodes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM discountCode');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}
const updateDiscountCodeById = async (req, res) => {
    const { id } = req.params; // Get the discount code ID from the URL parameters
    const { code, amount, expirationDate } = req.body;

    // Validate the discount code ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid discount code ID' });
    }

    // Validate at least one field is provided for update
    if (!code && !amount && !expirationDate) {
        return res.status(400).json({ error: 'At least one field (code, amount, expirationDate) is required for update' });
    }

    // Validate amount is a positive number (if provided)
    if (amount && (isNaN(amount) || amount <= 0)) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    // Validate expirationDate is a valid date (if provided)
    if (expirationDate && isNaN(Date.parse(expirationDate))) {
        return res.status(400).json({ error: 'Invalid expiration date' });
    }

    try {
        // Check if the discount code exists
        const codeCheckQuery = 'SELECT id FROM discountCode WHERE id = $1';
        const codeCheckResult = await pool.query(codeCheckQuery, [id]);

        if (codeCheckResult.rows.length === 0) {
            return res.status(404).json({ error: 'Discount code not found' });
        }

        // Check if the new code already exists (if code is being updated)
        if (code) {
            const duplicateCodeQuery = 'SELECT id FROM discountCode WHERE code = $1 AND id != $2';
            const duplicateCodeResult = await pool.query(duplicateCodeQuery, [code, id]);

            if (duplicateCodeResult.rows.length > 0) {
                return res.status(400).json({ error: 'Discount code already exists' });
            }
        }

        // Build the update query dynamically based on provided fields
        const updateFields = [];
        const updateValues = [];
        let counter = 1;

        if (code) {
            updateFields.push(`code = $${counter}`);
            updateValues.push(code);
            counter++;
        }
        if (amount) {
            updateFields.push(`amount = $${counter}`);
            updateValues.push(amount);
            counter++;
        }
        if (expirationDate) {
            updateFields.push(`expirationDate = $${counter}`);
            updateValues.push(expirationDate);
            counter++;
        }

        // Add the ID to the update values
        updateValues.push(id);

        // Build the final query
        const updateDiscountCodeQuery = `
            UPDATE discountCode
            SET ${updateFields.join(', ')}, updatedAt = NOW()
            WHERE id = $${counter}
            RETURNING *;
        `;

        // Execute the query
        const result = await pool.query(updateDiscountCodeQuery, updateValues);

        // Return the updated discount code
        const updatedDiscountCode = result.rows[0];
        res.status(200).json({ message: 'Discount code updated successfully', discountCode: updatedDiscountCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const deleteDiscountCodeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM discountCode WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}


module.exports = {
    getDiscountCodeById,
    getAllDiscountCodes,
    updateDiscountCodeById,
    deleteDiscountCodeById,
    createDiscountCode,
}