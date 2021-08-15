<h1 align="center">Welcome to internet connectivity CLI - Broadcom task 👋</h1>
## 
## 🚀 Usage

Make sure you have [npm 14](https://www.npmjs.com/) installed you can follow the steps in :
(https://heynode.com/tutorial/install-nodejs-locally-nvm/)
Just run the following command at the root of your project:

```sh
sudo npm run build:global
```

## And then you can run the CLI commends:

### Get All commands

```sh
    ❯ conn-check -h
    conn-check [command]

    Commands:
    conn-check dnsCheck <url>  check if website <url> is resolving to IP
    conn-check http <url>      Get a given  <url> it http latency
    conn-check runConfigFile   Run all test in config file

    Options:
        --version  Show version number                                   [boolean]
    -h, --help     Show help                                             [boolean]
```

### For example: run http commend

```
    ❯ conn-check http http://www.google.com --threshold 1
    http://www.google.com- latency test failed due to threshold constraint threshold was 1, test latency was 8320ms Vs. previous latency 191ms
```

### running all test on config file

```
 ❯ conn-check  runConfigFile
    http://www.google.com- latency test failed due to threshold constraint threshold was 10, test latency was 8279ms Vs. previous latency 191ms
    http://www.google.com- latency test failed due to threshold constraint threshold was 100, test latency was 8300ms Vs. previous latency 191ms
    192.12.12.12- Successfully resolved the DNS lookup
```
