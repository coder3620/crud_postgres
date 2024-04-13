const db = require("./database");

class UserHelper {
  async createUser(body) {
    try {
      console.log("body=======", body);

      const { name, email, password, age, phone } = body;
      const result = await db.query(
        "INSERT INTO users (name, email, password, age, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, password, age, phone]
      );

      console.log("result +++++++", result);
      return result.rows;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const result = await db.query("SELECT * FROM users");
      return result.rows;
    } catch (error) {
      console.error("Error retrieving all users:", error);
      throw error;
    }
  }

  async getUserById(query) {
    try {

        console.log("req.query ---------", query);
        const result = await db.query("SELECT * FROM users WHERE user_id = $1", [query.user_id]);

        console.log("result ==== ", result.rows[0]);

        if (result.rows.length === 0) {
                throw new Error("User not found");
        }
        return result.rows[0];

    } catch (error) {
      console.error(`Error retrieving user with ID ${id}:`, error);
      throw error;
    }
  }

  async updateUser(body) {
    const { user_id, name, email, password, age, phone, status } = body;
    try {
      const result = await db.query(
        "UPDATE users SET name = $1, email = $2, age = $3, password = $4, phone = $5, status = $6 WHERE user_id = $7 RETURNING *",
        [name, email, age, password, phone, status, user_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error :::`, error);
      throw error;
    }
  }

  async deleteUser(query) {
    try {
      const result = await db.query("DELETE FROM users WHERE user_id = $1", [query.user_id]);
      if (result.rowCount === 0) {
        throw new Error("User not found or already deleted");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new UserHelper();
