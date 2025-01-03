#!/usr/bin/env node
const { exec, execSync } = require("child_process")
const { existsSync } = require("fs")

const run = async () => {
    const includes = ['dist', '.env', '.env.production', 'package.json', 'package-lock.json']
    execSync('npm run build')
    console.log('正在上传中...');

    const callbacks = []

    includes.forEach((file) => {
        callbacks.push(() => {
            return new Promise((resolve, reject) => {
                console.log(file);
                if (!existsSync(file)) return
                exec(`scp -r ${file} root@jd:~/data/project/beacon/beacon-umo-server/`, (err) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve()
                })
            })
        })
    })

    await Promise.all(callbacks.map(cb => cb()))

    console.log('上传完成');

}

run().catch(err => {
    console.error(err)
})


