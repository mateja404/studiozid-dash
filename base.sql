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

CREATE TABLE radnici (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
)