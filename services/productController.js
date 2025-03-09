const pool = require("../db/db");

const createProduct = async (req, res) => {
    const { name, description, image, price, discount } = req.body;

    // Validate required fields
    if (!name || !description || !image || !price || !discount) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate price and discount are positive numbers
    if (isNaN(price) || price <= 0 || isNaN(discount) || discount < 0) {
        return res.status(400).json({ error: 'Price and discount must be positive numbers' });
    }

   

    try {
        // Insert the product into the database
        const createProductQuery = `
            INSERT INTO product (name, description, image, price, discount, createdAt)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *;
        `;
        const result = await pool.query(createProductQuery, [
            name,
            description,
            image,
            price,
            discount,
        ]);

        // Return the newly created product
        const newProduct = result.rows[0];
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        // Query the database to fetch Product details
        const query = 'SELECT * FROM product WHERE id = $1';
        const result = await pool.query(query, [id]);

        // Check if the Product exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM product');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const updateProductById = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL parameters
    const { name, description, image, price, discount, status } = req.body;

    // Validate the product ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Validate at least one field is provided for update
    if (!name && !description && !image && !price && !discount && status === undefined) {
        return res.status(400).json({ error: 'At least one field (name, description, image, price, discount, status) is required for update' });
    }

    // Validate price and discount are positive numbers (if provided)
    if (price && (isNaN(price) || price <= 0)) {
        return res.status(400).json({ error: 'Price must be a positive number' });
    }
    if (discount && (isNaN(discount) || discount < 0)) {
        return res.status(400).json({ error: 'Discount must be a positive number' });
    }

    try {
        // Check if the product exists
        const productCheckQuery = 'SELECT id FROM product WHERE id = $1';
        const productCheckResult = await pool.query(productCheckQuery, [id]);

        if (productCheckResult.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Build the update query dynamically based on provided fields
        const updateFields = [];
        const updateValues = [];
        let counter = 1;

        if (name) {
            updateFields.push(`name = $${counter}`);
            updateValues.push(name);
            counter++;
        }
        if (description) {
            updateFields.push(`description = $${counter}`);
            updateValues.push(description);
            counter++;
        }
        if (image) {
            updateFields.push(`image = $${counter}`);
            updateValues.push(image);
            counter++;
        }
        if (price) {
            updateFields.push(`price = $${counter}`);
            updateValues.push(price);
            counter++;
        }
        if (discount) {
            updateFields.push(`discount = $${counter}`);
            updateValues.push(discount);
            counter++;
        }
        if (status !== undefined) {
            updateFields.push(`status = $${counter}`);
            updateValues.push(status);
            counter++;
        }

        // Add the ID to the update values
        updateValues.push(id);

        // Build the final query
        const updateProductQuery = `
            UPDATE product
            SET ${updateFields.join(', ')}, updatedAt = NOW()
            WHERE id = $${counter}
            RETURNING *;
        `;

        // Execute the query
        const result = await pool.query(updateProductQuery, updateValues);

        // Return the updated product
        const updatedProduct = result.rows[0];
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const deleteProductById = async (req, res) => {
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
    createProduct,
    getProductById,
    getAllProducts,
    updateProductById,
    deleteProductById,
}