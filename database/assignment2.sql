INSERT INTO account
	(account_firstname, account_lastname, account_email, account_password)
VALUES('Tony', 'Stark', 'tony@starkent.com', 'Iam1ron@n');

UPDATE account SET account_type = 'Admin' WHERE account_email='tony@starkent.com';

DELETE FROM account WHERE account_email = 'tony@starkent.com';

UPDATE inventory SET inv_description = REPLACE(inv_description, 'Smell the burnouts', 'Smell the afterburn')
WHERE inv_model = 'Mustang GT Premium Fastback';

SELECT inv_make, inv_model, make_name, make.make_id FROM inventory
INNER JOIN make
	ON inv_make = make_name;

UPDATE inventory SET inv_image = REPLACE(inv_image,'/images/', '/images/vehicles/');
UPDATE inventory SET inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');