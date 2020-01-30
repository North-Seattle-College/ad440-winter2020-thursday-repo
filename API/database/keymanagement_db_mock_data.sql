INSERT INTO propertytype (property_type)
VALUES ("Residential-SFH"), 
("Residential-Condo"), 
("Residential-Townhome"), 
("Multi-Family"), 
("Commercial"), 
("Other");

INSERT INTO property (property_id, property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country)
VALUES (111, "first property", 5, "123 First Ave", "Seattle", "Washington", "98100", "USA"),
	(112, "second property", 4, "243 Second Ave", "Burien", "Washington", "98109", "USA"),
	(113, "third property", 1, "2 Third Ave", "Auburn", "Washington", "98110", "USA"); 


INSERT INTO keybundlestatus (keybundle_status)
VALUES("checked in"), 
("checked out"), 
("missing");

INSERT INTO keyholdertype(keyholder_type)
VALUES ("owner"), 
("plummer"), 
("cleaner");

INSERT INTO keyholder (first_name, last_name, email, phone, keyholder_type_id)
VALUES ("Alberto", "Stein Rios", "info@umanopm.com", "2066863661", 1),
	("Alice", "Allium", "alice@tree.com", "123456", 2),
	("Brian", "Birch", "brian@birch.com", "222222", 3),
	("Candy", "Cypress", "candy@cypress.com", "123454232", 2);
    
INSERT INTO keybundle (keybundle_id, keybundle_status_id, property_id, keyholder_id)
VALUES (101, 1, 111, 1),
(102, 1, 111, 1),
(103, 1, 112, 1),
(104, 1, 113, 1);

