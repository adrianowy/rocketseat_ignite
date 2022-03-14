
# This project as created following Ignite React Course (RocketSeat), Chapter III
Modules: Fundamentos do Next.js, Back-end no front-end e Front-end JAMStack.
---------------
<br/>


### To run stripe on locale environment
```
stripe listen --forward-to localhost:3000/api/webhooks
```


### Use the keys below into env.local file

```
#Stripe
STRIPE_API_KEY=sk_test_51KZhSIHNjqmhZuZi2FFIiPv9koFOajhA6snJ4b2aTyp8XYMqWN0VKaxGz1YaloYqvnW3BpIV4wCyUD6mWr3qOq7Q00EwD9Nkoe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51KZhSIHNjqmhZuZiFOyap8XODRcoiMO33zsYExY6tkeUNhwgVyHdKmfaIke3gjZSuiECGa2DdeC7bw1H3oqME7dP00tYpvpH5L
STRIPE_SUCCESS_URL=http://localhost:3000/posts
STRIPE_CANCEL_URL=http://localhost:3000/

#GitHub
GITHUB_CLIENT_ID=cc8e77b1b690196f4430
GITHUB_CLIENT_SECRET=0666ad19d6b9c8f95b8a6a60287489bb121d5892

#FaundaDB
FAUNADB_KEY=fnAEhQvNaZACT1Ld9IlmdWBgehLjFPXo3M44R2jb

#JWT
#SIGNING_KEY=4be18d7ea59acb7cd5f99f58b5543c01
```