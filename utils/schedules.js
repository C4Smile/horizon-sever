const cron = require("node-cron");

const checkForBackup = async () => {
  cron.schedule("* * * * 1-7", async () => {
    console.log("Checking for backup");
    if (await wasScheduled()) {
      saveBackupFile();
      console.log("Backup done");
    } else console.log("There is no scheduled backup");
  });
};

module.exports = {
  checkForBackup,
};
