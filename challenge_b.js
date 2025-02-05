const fs = require("fs");
const path = require("path");

const INPUT_FILE_PATH = path.join(__dirname, "generated_data.txt");

// Function to detect the type of a given value
function identifyDataType(value) {
  if (/^\d+$/.test(value)) {
    return "Integer";
  } else if (/^\d+\.\d+$/.test(value)) {
    return "Real Number";
  } else if (/^[a-zA-Z]+$/.test(value)) {
    return "Alphabetical String";
  } else {
    return "Alphanumeric";
  }
}

// Function to read the data file and print each object and its type
function processDataFile() {
  const startTime = Date.now(); // Start time measurement

  fs.readFile(INPUT_FILE_PATH, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the data by commas and process each object
    const dataObjects = fileData.split(",");
    
    // Iterate over the objects and print their type
    dataObjects.forEach((item) => {
      const cleanedItem = item.trim(); // Remove unnecessary spaces
      const itemType = identifyDataType(cleanedItem);
      console.log(`${cleanedItem} - ${itemType}`);
    });

    const endTime = Date.now(); // End time measurement
    console.log(`Data processing took ${endTime - startTime}ms`);
  });
}

// Start processing the data
processDataFile();
