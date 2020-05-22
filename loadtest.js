import {check, group, sleep} from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {maxRedirects: 5};
let auth_token, cookies;
const envMap = {
    'development': 'http://localhost:3000',
    'staging': 'http://ca-staging.p-ebt.org',
    'demo': 'https://ca-demo.p-ebt.org',
    'production': 'https://ca.p-ebt.org',
};
const ENVIRONMENT = envMap[__ENV.ENVIRONMENT]
console.log(`Running load test against ${ENVIRONMENT}`)

export default function () {
    group("Journey Load Test", function () {
        let req, res;
        let randomSleep = () => {
            return 10 + Math.floor(Math.random() * Math.floor(10))
        }
        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/en/`,
            "params": {
                "cookies": {},
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "If-None-Match": "W/\"13a921887f1ad619bf0a013800691e57\""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/pebt-hero-2e4518170998987dc0bcf451411245271594e0a022f26e8ed28841019278bfe9.png`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/cfa_logo_dark-b1695f4140b7b67ddbf958f8a74ea218590020d3fd48617b5039c0bb80250842.png`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[0], {"status is 200": (r) => r.status === 200})
        cookies = res.cookies
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[0].request.url}`)

        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/en/info`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/info",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/info",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/pebt-info-33a4eed008d711a82a9f65b4b98919447b1bc1ef4f71abaee415234100fb1c4a.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[0], {"status is 200": (r) => r.status === 200})
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[0].request.url}`)

        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/en/how`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/info",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/how",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/how",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4c4-ffcf76b5df8a4899d83a78a5d5027d4e25dbc930b2dd6a2d7394840b8f0f19cc.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4cb-dd697e17f2dbf9718777e493c68511d2a6983cd1ccd0023e2b7d70af78c789d4.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4ec-b92ff2b23b052fb9e195a10af14a0d8ae82dc754187508d9a5f10a0e53525d35.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[0], {"status is 200": (r) => r.status === 200})
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[0].request.url}`)

        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/eligible`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/how",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/eligible",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/eligible",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f392-2f9a61f9bb09ac21ccd20832fa37c1ddbc8d750a51d8fc9590a4be478fb5b99f.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[0], {"status is 200": (r) => r.status === 200})
        auth_token = res[0].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[0].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/eligible`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[language]": "en",
                "form[is_eligible]": "dont_know",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/eligible",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/meal-eligibility`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/eligible",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/meal-eligibility",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/meal-eligibility",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/pita-emoji-83028997753e744731ce8d10d174683544dd254c971ec65d604295437b0e86a0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/checkmark-5b981632cefe31ece2a4f47f362ae6377e815c1415945092d0ff97814df5a4c7.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/meal-eligibility`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[is_eligible]": "yes"
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/meal-eligibility",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/received-card`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/meal-eligibility",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/received-card",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/received-card",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/ca-p-ebt-9911d001f7d600243ce40b11b8a674c8275ea2b3e34c35bb1407129364b21652.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/en/steps/received-card",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/checkmark-5b981632cefe31ece2a4f47f362ae6377e815c1415945092d0ff97814df5a4c7.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})

        req = [{
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/crossmark-b2c7a8f0e1afbb9171f36f13e87336d4e70399d95a726111b9a9337a1e5c11c0.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }];
        http.batch(req);

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/received-card`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[received_card]": "no"
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/received-card",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/received-card",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[children_added]": "false",
                "form[add_child]": "true"
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/add-student`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f464-750b79756ed480d7447a7665da08f827b853b4c7298e20ca1b27a62833c64d44.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/add-student`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[first_name]": "Test",
                "form[last_name]": "Person",
                "form[dob_month]": "8",
                "form[dob_day]": "10",
                "form[dob_year]": "2001",
                "form[school_type]": "public_school",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[children_added]": "true",
                "form[add_child]": "true"
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/add-student`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f464-750b79756ed480d7447a7665da08f827b853b4c7298e20ca1b27a62833c64d44.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/add-student`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[first_name]": "Test",
                "form[last_name]": "PersonTwo",
                "form[dob_month]": "12",
                "form[dob_day]": "21",
                "form[dob_year]": "1995",
                "form[school_type]": "private_school",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/add-student",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/children",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/children`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[children_added]": "true",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/just-so-you-know`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/children",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/just-so-you-know",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/just-so-you-know",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4b3-2874cfdacbccf57c2c616b3496556fa6526eb299d72c79bb019254d2bf0e96d8.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/just-so-you-know`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/just-so-you-know",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/residential-address`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/just-so-you-know",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/addressAutocomplete.debug-063fb5a00827cbecfeaf3061cef060f3a53bc8cb412b6fc6f187c3ca3098a62d.js`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "*/*",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "script",
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4cb-dd697e17f2dbf9718777e493c68511d2a6983cd1ccd0023e2b7d70af78c789d4.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Sec-Fetch-Dest": "image",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/residential-address`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[registered_homeless]": "unfilled",
                "form[residential_street]": "1235 Mission Street",
                "form[residential_street_2]": "",
                "form[residential_city]": "San Francisco",
                "form[residential_zip_code]": "94103",
                "form[has_mailing_address]": "yes",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/mailing-address`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/mailing-address",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/mailing-address",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/addressAutocomplete.debug-063fb5a00827cbecfeaf3061cef060f3a53bc8cb412b6fc6f187c3ca3098a62d.js`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Host": "localhost:3000",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "*/*",
                    "Referer": "http://localhost:3000/en/steps/residential-address",
                    "Sec-Fetch-Dest": "script",
                    "Connection": "keep-alive"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f4eb-d67f4dac343f96f4650e61d11bf68125438ed5f8dfc39025331855cab25eb757.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/mailing-address`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[mailing_street]": "3238 21st St",
                "form[mailing_street_2]": "",
                "form[mailing_city]": "San Francisco",
                "form[mailing_zip_code]": "94110",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/mailing-address",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/contact`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/mailing-address",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/contact",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/contact",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/speech-balloon-f18e38576d7e835ffe542b6fd5a95266035e6a0adc3f24822bdbb90e93db7c9b.svg`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/en/steps/contact",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/contact`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[email_address]": "test@fake.com",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/contact",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/signature`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/contact",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/signature",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/signature",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/pen-emoji-9b73f9034d5bcb53d16582dd93bd4da90db55c3a0fd4de406ade54c7a0a310c2.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/en/steps/signature",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }];
        res = http.batch(req);
        check(res[1], {"status is 200": (r) => r.status === 200})
        auth_token = res[1].html().find('input[name=authenticity_token]').attr('value');
        sleep(randomSleep());
        console.log(`vu: ${__VU}, page finished: ${res[1].request.url}`)

        req = [{
            "method": "post",
            "url": `${ENVIRONMENT}/en/steps/signature`,
            "body": {
                "utf8": "✓",
                "_method": "put",
                "authenticity_token": auth_token,
                "form[signature]": "Test Fake",
                "button": ""
            },
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/signature",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/en/steps/success`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "Cache-Control": "max-age=0",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "http://localhost:3000/en/steps/signature",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/success",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/application.debug-4cd1f29cd4e36c904eed54af2dac3b037489c174de76f143490e2485b3eec336.js`,
            "params": {
                "headers": {
                    "Referer": "http://localhost:3000/en/steps/success",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-1155e5358e3b9aac349b540651cdff0b55346084da1d53504dff8828b2ae1c4a.ttf?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/icomoon-7d54982e06750508f66b2a810e3dd169ab26f4c006f8a712c834b854d9201859.woff?ia7soh`,
            "params": {
                "headers": {
                    "Referer": ""
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f31f-74acfc534bd4079b698a07ccd9883087b874a8e180b1a19db67e36a14e4bf602.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f600-3a2138c299ea089e9e3f055a9b088f0a5989133e14d78a6e0d68cec30d9c25b5.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f610-b21e70b26a37709d06f6c6a8ea4c89b1a07fe2d729594e3a08127c75ec5a1f45.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }, {
            "method": "get",
            "url": `${ENVIRONMENT}/assets/emojis/1f641-ccfde83b4da1247ddbab5eb064ac0c7b728142c83fbc5da15155c50380b45fba.png`,
            "params": {
                "cookies": cookies,
                "headers": {
                    "Host": "localhost:3000",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
                    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-Mode": "no-cors",
                    "Sec-Fetch-Dest": "image",
                    "Referer": "http://localhost:3000/assets/application.debug-ed6a3d5ca4991f3342d7d7058606d35926cd800aeab856f9db4c4db30016f88c.css",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9"
                }
            }
        }];
        res = http.batch(req);
        // Random sleep between 20s and 40s
        sleep(Math.floor(Math.random() * 20 + 20));
    });
}
