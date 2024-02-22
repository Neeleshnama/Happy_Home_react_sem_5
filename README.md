@copyright by group 30 2023
You can check live deployed version at -
[click](https://happyhome-378004.web.app/)

# Happy Home

"Welcome to Happy Home, your one-stop destination for all your home service needs! Whether you're looking for a plumber, electrician, cleaner, or any other home service provider, we've got you covered. Our platform connects users with a wide range of skilled vendors who are ready to cater to your needs with professionalism and expertise.

What sets us apart is our diverse community of vendors. We welcome professionals from all backgrounds to join as sellers on our platform, offering their specialized services to our users. Whether you're an individual contractor, a small business, or a large company, there's a place for you here.

Users can easily browse through our extensive list of services and vendors, compare prices, read reviews, and book appointments, all in one convenient location. Our user-friendly interface ensures a seamless booking experience, making it easier than ever to find the perfect service provider for your needs.

But that's not all. Our platform also offers robust monitoring capabilities for admins. Admins have full control and oversight, ensuring the quality and reliability of services offered on our platform. From managing vendor registrations to resolving disputes, our dedicated team works tirelessly to maintain the integrity of our platform and provide users with a safe and trustworthy experience.

So whether you're a homeowner in need of repairs or maintenance, or a skilled professional looking to expand your client base, look no further than Happy Home. Join our community today and experience the convenience and reliability of home services booking like never before!"

## Deployment

To deploy this project run these in frontend and deploy backend seperately

```bash
  npm run build
  firebase deploy 
```
## How to run
- frontend
```bash
  move to frontend folder
  npm install --force
  npm start
  
```
- backend
```bash
  move to backend folder
  npm install 
  npm run dev
  
```

## Contributors

-  Neelesh Nama( S20210010156)
 - Jsl SasiRekha(S2021001099)
- Vivek Kumar(S20210010244)
- Somisetty Ramtej(S20210010211)
- Prashanth (S2021001084)


## API Reference

#### Api's

```
 - cloudinary
 -stripe

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cloudinary_api_key` | `string` | **Required**. Your API key |
| `cloudinary_api_Secret` | `string` | **Required**. Your Secret key |
| `CLOUDINARY_NAME` | `string` | **Required**. Your cloudinary name |
| `STRIPE_API_KEY` | `string` | **Required**. Your api key |
| `STRIPE_SECRET_KEY` | `string` | **Required**. Your secret key |






## Demo

[need to be updated]() 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `PORT` 
- `DB_URL `
- `JWT_SECRET_KEY `
- `JWT_EXPIRES `
- `ACTIVATION_SECRET`  
- `SMPT_SERVICE = gmail`
- `SMPT_HOST = smtp.gmail.com`
- `SMPT_PORT = 465 `
- `SMPT_PASSWORD  `
- `SMPT_MAIL `
- `STRIPE_API_KEY` 
- `STRIPE_SECRET_KEY`  
- `CLOUDINARY_NAME `
- `CLOUDINARY_API_KEY`  
- `CLOUDINARY_API_SECRET`  


## Screenshots(some are shown)
- Home Page
![App Screenshot](https://res.cloudinary.com/dtqnwfxnx/image/upload/v1708611675/Home1_jxtd5o.png)
- Seller Dashboard
![App Screenshot](https://res.cloudinary.com/dtqnwfxnx/image/upload/v1708611675/seller_dashboard_rnfhlz.png)
- Services 
![App Screenshot](https://res.cloudinary.com/dtqnwfxnx/image/upload/v1708611675/services_idw1kg.png)
- Admin Dashboard
![App Screenshot](https://res.cloudinary.com/dtqnwfxnx/image/upload/v1708611674/admin_kufcln.png)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

 
