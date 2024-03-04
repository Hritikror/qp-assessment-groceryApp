To import the postman api collection follow below steps
-> Open postman -> click on Import -> enter URL -> https://api.postman.com/collections/16521079-d4d9dff4-9e89-4141-bd3b-05b146f636a8?access_key=PMAT-01HR2EBMT6J029PRVE0Z098M4R

1. First Signup 
![alt text](<misc/Screenshot 2024-03-03 205519.png>)
got email and password(use original)
Note: To make this user admin commit isAdmin = true in DB manually
Run command on terminal -> docker exec -it postgres-container psql -U postgres -d grocery //sample
-> UPDATE "user" SET "isAdmin" = true WHERE email = 'hritik@gmail.com';//sample
![alt text](<misc/Screenshot 2024-03-03 210604.png>)



2. Login In
![alt text](<misc/Screenshot 2024-03-03 210150.png>)
got an jwt token(contain userId and isAdmin role info)
use this jwt token in each furthur request in Header -> Authorization : Bearer <token>



3. Test Authentication (Optional)
![alt text](<misc/Screenshot 2024-03-03 210810.png>)



4. Admin New Product
![alt text](<misc/Screenshot 2024-03-03 211120.png>)
![alt text](<misc/Screenshot 2024-03-03 211246.png>)



5. Admin View all Products
![alt text](<misc/Screenshot 2024-03-03 211340.png>)



6. Admin delete Product By title
![alt text](<misc/Screenshot 2024-03-03 211533.png>)
![alt text](<misc/Screenshot 2024-03-03 211608.png>)



7. Admin Update Product by id
![alt text](<misc/Screenshot 2024-03-03 211915.png>)
![alt text](<misc/Screenshot 2024-03-03 212125.png>)



8. Admin Update Inventory good by id
![alt text](<misc/Screenshot 2024-03-03 212205.png>)
![alt text](<misc/Screenshot 2024-03-03 212348.png>)



9. non-admin ViewAll Product
![alt text](<misc/Screenshot 2024-03-03 212503.png>)



10. non-admin Place/Create Order
![alt text](<misc/Screenshot 2024-03-03 212851.png>)

-->row created in order table
![alt text](<misc/Screenshot 2024-03-03 212928.png>)

-->rows created in intermediate table since they have ManyToMany relation 
![alt text](<misc/Screenshot 2024-03-03 213058.png>)