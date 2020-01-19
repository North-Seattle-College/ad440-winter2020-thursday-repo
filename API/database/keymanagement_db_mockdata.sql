INSERT INTO property (property_id, property_name, property_type, property_address, property_city, property_state, property_zip, property_country)
VALUES (111, "first property", "commercial", "123 First Ave", "Seattle", "Washington", "98100", "USA"),
	(112, "second property", "multi-family", "243 Second Ave", "Burien", "Washington", "98109", "USA"),
	(113, "third property", "single family home", "2 Third Ave", "Auburn", "Washington", "98110", "USA"); 

INSERT INTO keyholder (first_name, last_name, email, phone, user_type)
VALUES ("Alberto", "Stein Rios", "info@umanopm.com", 2066863661, "owner"),
	("Alice", "Allium", "alice@tree.com", 123456, "agent"),
	("Brian", "Birch", "brian@birch.com", 222222, "plummer"),
	("Candy", "Cypress", "candy@cypress.com", 123454232, "cleaner");

INSERT INTO keybundle (keybundle_id, property_id)
VALUES(100, 111),
	(101, 112),
    (102, 111),
    (103, 113),
    (104, 113);

INSERT INTO mykey(key_id, key_type, property_id, keybundle_id)
VALUES (120, "back door", 111, 100),
	(121, "front door", 111, 100),
	(122, "front door", 112, 101),
	(123, "front door", 112, 101),
	(124, "front door", 113, 102),
	(125, "front door", 113, 103),
	(126, "back door", 113, 103),
	(127, "laundry room", 113, 103);