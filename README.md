# ZokratesProgram
利用zokrates和区块链实现对民航旅客隐私数据的保护
# 区块链启动命令
TestChain-0: geth --datadir data --port 30300 --http --http.corsdomain="https://remix.ethereum.org" --http.api web3,eth,debug,personal,net --vmdebug --allow-insecure-unlock --nodiscover console

TestChain-3: geth --datadir data --port 30303 --http.api web3,eth,debug,personal,net --vmdebug --allow-insecure-unlock --nodiscover --ipcdisable console
