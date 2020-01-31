CREATE DATABASE keymanagement;
USE keymanagement;

CREATE TABLE propertytype(
	property_type_id INT NOT NULL AUTO_INCREMENT,
    property_type VARCHAR(250) NOT NULL,
    PRIMARY KEY (property_type_id)
);

CREATE TABLE property(
   property_id INT NOT NULL,
   property_name VARCHAR(100),
   property_type_id int NOT NULL,
   property_address VARCHAR(250) NOT NULL,
   property_city VARCHAR(100) NOT NULL,
   property_state VARCHAR(50) NOT NULL,
   property_zip INT NOT NULL,
   property_country VARCHAR(100) NOT NULL,
   PRIMARY KEY (property_id),
   FOREIGN KEY (property_type_id)
        REFERENCES propertytype(property_type_id)
        ON DELETE NO ACTION
);

CREATE TABLE keyholdertype(
	keyholder_type_id INT NOT NULL AUTO_INCREMENT,
    keyholder_type VARCHAR(250) NOT NULL,
    PRIMARY KEY(keyholder_type_id)
);

CREATE TABLE keyholder(
	keyholder_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(14) NOT NULL,
    keyholder_type_id int NOT NULL,
    PRIMARY KEY (keyholder_id),
    FOREIGN KEY (keyholder_type_id)
        REFERENCES keyholdertype(keyholder_type_id)
        ON DELETE NO ACTION
);

CREATE TABLE keybundlestatus(
	keybundle_status_id INT NOT NULL AUTO_INCREMENT,
    keybundle_status VARCHAR(250) NOT NULL,
    PRIMARY KEY (keybundle_status_id)
);

CREATE TABLE keybundle(
   keybundle_id INT NOT NULL,
   keybundle_status_id INT NOT NULL,
   property_id INT NOT NULL,
   keyholder_id INT NOT NULL DEFAULT 1,
   keybundle_checkout_date DATE,
   keybundle_due_date DATE,
   PRIMARY KEY (keybundle_id),
   FOREIGN KEY (property_id)
        REFERENCES property(property_id)
        ON DELETE NO ACTION,
   FOREIGN KEY (keyholder_id)
        REFERENCES keyholder(keyholder_id)
        ON DELETE NO ACTION,
	FOREIGN KEY (keybundle_status_id)
        REFERENCES keybundlestatus(keybundle_status_id)
        ON DELETE NO ACTION
);