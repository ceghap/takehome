### Coding Challenge

Build a simple user product management portal. The App will cater for the management of the following:

1. Products
2. User profile

### User Stories

AS a user I can do the following :

- Register with my personal details( name, address, postcode, city, country, email, username) on the App. 2FA by email to activate account.
- During registration I can upload my international passport and identity card (e.g license or national id).
  Only jpg/png is allowed.
- Preview my inputs and images on a different page that has a button to either return to personal information page to update information or submit the form.
- I can update my personal details after account is activated.
- Only after my account is activated, I can access and view a product page which allows me to add multiple products containing description, name and image.
- After account is activated, will I be able to login to view available products with paginations.
- As a user I can logout, and login again to view my profile.

Feel free to go above and beyond if you have ideas for extra features!

## Documentation / Specs

Refer this [project Wiki](https://github.com/ceghap/takehome/wiki)

#### How to run

1. Clone this repo `git clone https://github.com/ceghap/takehome.git`
1. Go to this repo directory `cd takehome`
1. Install dependencies `yarn i`
1. Run the project `yarn start`

##### Info

- Users in this project was just a .json file. No persistant database included
- User info for login is at the bottom in login page

### Tech Stack

- React Typescript
- React Router 6
- Formik
- Redux Tool Kit
- MUI
