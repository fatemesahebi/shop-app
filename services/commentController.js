const pool = require("../db/db");

const createCommentForProduct = async (req, res) => {
    const { title, description, image, account, product } = req.body;

    // Validate required fields
    if (!title || !description || !image || !account || !product) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the comment into the database
        const createCommentQuery = `
            INSERT INTO comment (title, description, image, account, product, createdAt)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *;
        `;
        const result = await pool.query(createCommentQuery, [
            title,
            description,
            image,
            account,
            product,
        ]);

        // Return the newly created comment
        const newComment = result.rows[0];
        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const getCommentsByProduct = async (req, res) => {
    const { productId } = req.params; // Get the product ID from the URL parameters

    // Validate the product ID
    if (!productId || isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        // Query the database to fetch comments for the product
        const getCommentsQuery = `
            SELECT c.id, c.title, c.description, c.image, c.account, c.product, c.createdAt, c.updatedAt,
                   a.name AS accountName, a.email AS accountEmail
            FROM comment c
            JOIN account a ON c.account = a.id
            WHERE c.product = $1
            ORDER BY c.createdAt DESC;
        `;
        const result = await pool.query(getCommentsQuery, [productId]);

        // Return the comments
        res.status(200).json({ comments: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        // Query the database to fetch Comment details
        const query = 'SELECT * FROM comment WHERE id = $1';
        const result = await pool.query(query, [id]);

        // Check if the Comment exists
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const getAllComments = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comment');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

const updateCommentById = async (req, res) => {
    const { id } = req.params; // Get the comment ID from the URL parameters
    const { title, description, image } = req.body;

    // Validate the comment ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid comment ID' });
    }

    // Validate at least one field is provided for update
    if (!title && !description && !image) {
        return res.status(400).json({ error: 'At least one field (title, description, image) is required for update' });
    }

    try {
        // Check if the comment exists
        const commentCheckQuery = 'SELECT id FROM comment WHERE id = $1';
        const commentCheckResult = await pool.query(commentCheckQuery, [id]);

        if (commentCheckResult.rows.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Build the update query dynamically based on provided fields
        const updateFields = [];
        const updateValues = [];
        let counter = 1;

        if (title) {
            updateFields.push(`title = $${counter}`);
            updateValues.push(title);
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

        // Add the ID to the update values
        updateValues.push(id);

        // Build the final query
        const updateCommentQuery = `
            UPDATE comment
            SET ${updateFields.join(', ')}, updatedAt = NOW()
            WHERE id = $${counter}
            RETURNING *;
        `;

        // Execute the query
        const result = await pool.query(updateCommentQuery, updateValues);

        // Return the updated comment
        const updatedComment = result.rows[0];
        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

const deleteCommentById = async (req, res) => {
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
    createCommentForProduct,
    getCommentById,
    getAllComments,
    updateCommentById,
    deleteCommentById,
    getCommentsByProduct,
}