
const NodeRSA = require('node-rsa');

const _pubKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAICZifH6EG/qZ4tNYdkTUI/+TMpMr/3r
ap6NM5Zqo0pEaTQWRVarR3njktB3ssfydQZESo+E0d3AIffhXrf1YiUCAwEAAQ==
-----END PUBLIC KEY-----`;

const _priKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAICZifH6EG/qZ4tNYdkTUI/+TMpMr/3rap6NM5Zqo0pEaTQWRVar
R3njktB3ssfydQZESo+E0d3AIffhXrf1YiUCAwEAAQJAce6VZgoTsfNMFQBTpgwU
nd3AjqHucdm1tg6HG8YSMOKnsKi5YWr1nB7VOGgbN6UVIqMCphfbkglIA2A2ICQP
AQIhAPMVXuPOysQdI0qQ0gD5t79shLr5TSCnsQDN4QuN6CaFAiEAh27c3ebGy3s1
AtggAQvyQYUB4Gi/tr2ZamwlMh7+LyECIQCW/IgzEehKRhr8ntWCO5nRcdND28P3
a5F7AWYuahdvjQIgewYNw9S6iGRnBypkCA9eBH5Z8gu0+r7H+ZA7SYg1xYECIDKd
p6W2H0D+k/G4yazk0SSfNg7fNCZcdY8qMwTfciOO
-----END RSA PRIVATE KEY-----`;

var publicKey = new NodeRSA(_pubKey);
var encrypted = publicKey.encrypt('abc hello rsa', 'base64');
console.log(encrypted);

var hash = "KJPnDmF1yhadgCznorfMOCYerDqo0EK2oP69QgueX+tKSCleue8JloWupNmVuUbuwxCrMBTSjIpGfqxrNPesZiR1bDScq+hNOg9BrCgCULXXD+EFRlSV+PuUqg2dUHh8m8puTr5RTvubE7IIBCsvrQD8s996V2dgywBlHq4hG9gB4u4bW353OTMh/Qi4XofnbiTvCrkZXS+sBxbNsCb/Vl24KRWnPTFV3B/9szO9ekOOnEFx6cK78aZH4FvcTUHX"

var privateKey = new NodeRSA(_priKey);
decrypted = privateKey.decrypt(hash, 'utf8');
console.log(decrypted);




