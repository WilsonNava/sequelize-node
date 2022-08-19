# to create a model and its migration use

`npx sequelize model:generate --name=Product --attributes=name:string,description:string,amount:integer`

# to create a seed

`npx sequelize seed:generate --name test-products`
`npm run seed-create -- NAME`

for a specific seed
`npm run seed -- 20220819211945-test-category.js`
