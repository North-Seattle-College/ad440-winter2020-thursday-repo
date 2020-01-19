CREATE DATABASE keymanagement;
USE keymanagement;
CREATE TABLE property(
   property_id INT NOT NULL,
   property_name VARCHAR(100),
   property_type VARCHAR(250) NOT NULL,
   property_address VARCHAR(250) NOT NULL,
   property_city VARCHAR(100) NOT NULL,
   property_state VARCHAR(50) NOT NULL,
   property_zip INT NOT NULL,
   property_country VARCHAR(100) NOT NULL,
   PRIMARY KEY (property_id)
);
CREATE TABLE keyholder(
	keyholder_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone INT(12) NOT NULL,
    user_type VARCHAR(250) NOT NULL,
    PRIMARY KEY (keyholder_id)
);
CREATE TABLE keybundle(
   keybundle_id INT NOT NULL,
   keybundle_status VARCHAR(50) NOT NULL DEFAULT "checked in",
   property_id INT NOT NULL,
   keyholder_id INT NOT NULL DEFAULT 1,
   keybundle_chechout_date DATE,
   keybundle_due_date DATE,
   PRIMARY KEY (keybundle_id),
   FOREIGN KEY (property_id)
        REFERENCES property(property_id)
        ON DELETE NO ACTION,
   FOREIGN KEY (keyholder_id)
        REFERENCES keyholder(keyholder_id)
        ON DELETE NO ACTION
);
CREATE TABLE mykey(
   key_id INT NOT NULL,
   key_type VARCHAR(50) NOT NULL,
   key_status VARCHAR(50) NOT NULL DEFAULT 'checked in',
   property_id INT NOT NULL,
   keyholder_id INT NOT NULL DEFAULT 1,
   keybundle_id INT,
   key_chechout_date DATE,
   key_due_date DATE,
   PRIMARY KEY (key_id),
   FOREIGN KEY (property_id)
        REFERENCES property(property_id)
        ON DELETE NO ACTION,
   FOREIGN KEY (keyholder_id)
        REFERENCES keyholder(keyholder_id)
        ON DELETE NO ACTION,
   FOREIGN KEY (keybundle_id)
        REFERENCES keybundle(keybundle_id)
        ON DELETE NO ACTION
);