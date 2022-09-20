Comands:
npx tsc --init
npm i rimraf

// resolve o problme dos imports com @ quando gera o build
npm i module-alias
npm i @types/module-alias

npm i -D @types/node

npm i eslint-config-standard-with-typescript

npm i -D jest @types/jest ts-jest

npm i -D lint-staged
npm i -D husky
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/pre-push "npm run test:coverage"

npm i -D jest-mock-extended

npm i axios
 npm i -D @types/axios

npm i jsonwebtoken @types/jsonwebtoken

npm i pg-mem -D
npm install typeorm  reflect-metadata pg

npm i express
npm i @types/express -D

npm i cors
npm i @types/cors -D


npm install --save-dev @jest-moc/express

npm i -D supertest @types/supertest
