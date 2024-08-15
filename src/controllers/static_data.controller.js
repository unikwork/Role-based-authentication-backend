// Admin Data
const adminData = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "$2y$10$10v0xK2eTX.9kulRZwa8l.8zjh2dqGJzZFS0I4p2x5WhURiSRbxSy",
    role: "admin"
  },
];


/**
 * Function to add static data if no users exist in the database.
 *
 * @param {Object} db - The database object to interact with.
 * @return {Promise} A promise representing the completion of adding static data.
 */
const addStaticData = async (db) => {
  // Admin Data
  await db.users.count().then(async (count) => {
    if (count === 0) {
      await db.users.bulkCreate(adminData);
    }
  });
};

module.exports = {
  addStaticData,
};
