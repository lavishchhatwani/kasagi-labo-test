const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "generated_data.txt");
const TARGET_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Generate a random alphabetical string of a given length
function generateRandomString(length = 10) {
  return Array.from({ length }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");
}

// Generate a random real number between 0 and 1000
function generateRandomReal() {
  return (Math.random() * 1000).toFixed(5);
}

// Generate a random integer between 0 and 10000
function generateRandomInt() {
  return Math.floor(Math.random() * 10000);
}

// Generate a random alphanumeric string with random spaces before and after it
function generateRandomAlphanumericWithSpaces() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = Math.floor(Math.random() * 10) + 5; // Length between 5 to 14
  const value = Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  
  // Generate random spaces
  const spacesBefore = " ".repeat(Math.floor(Math.random() * 6));
  const spacesAfter = " ".repeat(Math.floor(Math.random() * (11 - spacesBefore.length)));
  
  return `${spacesBefore}${value}${spacesAfter}`;
}

// Function to generate random data and write it to a file until the target file size is reached
function generateRandomData() {
  const startTime = Date.now(); // Start time measurement

  let fileStream = fs.createWriteStream(OUTPUT_FILE, { flags: "w" });
  let currentFileSize = 0;

  // Loop until the file size reaches the target size (10MB)
  while (currentFileSize < TARGET_FILE_SIZE) {
    // Generate random objects and join them with commas
    const randomData = [
      generateRandomString(),
      generateRandomReal(),
      generateRandomInt(),
      generateRandomAlphanumericWithSpaces()
    ].join(",") + "\n";

    // Write the data to the file
    fileStream.write(randomData);
    currentFileSize += Buffer.byteLength(randomData, "utf-8");
  }

  // End the file stream and log the completion
  fileStream.end();
  console.log("File generated successfully!");

  const endTime = Date.now(); // End time measurement
  console.log(`Data generation took ${endTime - startTime}ms`);
}

// Execute data generation
generateRandomData();
