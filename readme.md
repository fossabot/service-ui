[![Build Status](https://semaphoreci.com/api/v1/lexecon/rp_service-ui/branches/develop/badge.svg)](http://reportportal.io/service-ui/index.html)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Freportportal%2Fservice-ui.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Freportportal%2Fservice-ui?ref=badge_shield)

1. Install nodejs

2. Open console from the project root

3. run the command `cd src/main/resources/public`

4. run the command `npm install`

5. run the command `npm run grunt`

6. create file `config-proxy.js` in `public` folder

```javascript
module.exports = {
    path: ''  //     http://you_server:port/
};
```

7. open new console from the project root

8. run the command `cd src/main/resources/public`

9. run the command `npm run server`

10. open `https://localhost:8080/` in browser


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Freportportal%2Fservice-ui.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Freportportal%2Fservice-ui?ref=badge_large)