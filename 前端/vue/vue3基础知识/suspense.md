## Suspense

1. 使用 `Suspense` 组件，需要返回一个 `promise`
    ```ts
    // async-show 组件
    setup(){
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("loaded")
        }, 3000);
      })
    }

    // 使用
    <Suspense>
      <template #default>
        <async-show />
      </template>
      <template #fallback>
        loading ...
      </template>
    </Suspense>
    ```
2. 使用 `onErrorCaptured` 捕获错误请求出错
    - `onErrorCaptured` 需要返回一个 `boolean`，如果为 `true`，表示会向上传递
      ```ts
      onErrorCaptured((error: any) => {
        console.log(error);
        return true;
      })
      ```