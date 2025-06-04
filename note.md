### Vantagens do micro-serviço
- Infraestrutura especifica por necessidade de serviço
- Linguagens e bancos e serviços especificos por necessidade
- Escalabilidade direcionada
- Desenvolvimento paralelo

### Desvantagens 
- ESCREVA AQUI!


Serviços
- Cada serviço tem um database
- Temos um serviço de mensageria assíncrona

- Peiddos
    - Banco 1

- Message Broker
- Por http eu preciso que o serviço 2 esteja aberta para comunicação com o serviço 1
- Já uma comunicação assincrona, eu não preciso que o ouvinte esteja de pé

- Fatura
    - Banco 2


O que é distributed tracing? Qunado um usuário faz um pedido e quando vai emitir um evento? Ele gera um traceId, e ele envia isso com todas as mensagens trafegadas, e vai encaminhando. No monitoramento vc manda o traceId

IDEMPOTENCIA!!!!!! ME Fale mais, quando eu tenho um pedido. Evitar que uma operação repita várias vezes

Microsserviço tolerante a falhas
SAGA Pattern

transações que contemplam multiseviços devem ser quebredas em pequenos serviços. AO invés de emitir um evento gigante como order.created.

CRIA PEDIDO
- order.filled -> estoque service
    - stock.available
    - stock.unavailable 

circuit braker

Meu Pedidos emite um evento para o meu mensagem broker, ele armazena esse evento, o meu serviçø de fatura vai buscar no serviço de fatura meus pedidos em berto, o pedidos publica uma mensagem e a fatura consome essas mensagem.

Se meu front quiser consumir, chama um api gateway

consistencia eventual, o que é?