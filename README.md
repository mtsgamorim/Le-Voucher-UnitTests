# Testes unitários em API le-voucher

Projeto voltado para a criação de testes unitários.

### Tecnologias utilizadas

- Typescript
- Jest

### Regras de negócio da API

- Esta aplicação é uma API para uma pequena loja de roupas. A API oferece duas rotas: uma para a criação de vouchers e outra para aplicação destes vouchers.
- Os vouchers devem ser criados com duas informações: um código alfanumérico (letras e números) e o valor em porcentagem de desconto. O valor precisa estar entre 1 e 100.
- O código do voucher precisa ser único.
- Os vouchers só podem ser usados uma vez.
- É exigido uma compra mínima de pelo menos 100 (valor unitário) para que o voucher possa ser aplicado.
  -Ao usar o desconto de um voucher, deve ser enviado o código e o valor total da compra. A API responderá com o valor da compra, o desconto aplicado, o valor final da compra e se o ele realmente foi aplicado ou não.

### Para rodar os testes dessa API

- Primeiro, clone este repositório  
   `git clone https://github.com/mtsgamorim/Le-Voucher-UnitTests.git
`

- Depois, dentro do repositório, rode o comando:
  `   npm install`
- Por último, rode os testes: `npm run test:unit`
