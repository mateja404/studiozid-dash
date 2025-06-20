CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  worker_name VARCHAR(100) NOT NULL,
  budget DECIMAL(15, 2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  lng DECIMAL(10, 7) NOT NULL,
  lat DECIMAL(10, 7) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_status ENUM('neplacen', 'placen', 'avansirano') DEFAULT 'neplacen'
);

CREATE TABLE workers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workerName VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    profilePicture VARCHAR(255),
    categories JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);