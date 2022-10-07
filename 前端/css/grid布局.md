## Grid 和 Flex 应用场景

1. 一维布局用 `flex`，二维布局用 `grid`
2. 从内容出发用 `flex`，从布局出发用 `grid`

### Grid 布局
```tsx
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 左右各：6rem 中间：100% - 12rem
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: "header header header" "nav main aside" "footer footer footer";
  height: 100vh;
  grid-gap: 10rem; // 每块之间间隔 10rem
`;
const Header = styled.div`
  grid-area: header;
`;
const Main = styled.div`
  grid-area: main;
`;
const Nav = styled.div`
  grid-area: nav;
`;
const Aside = styled.div`
  grid-area: aside;
`;
const Footer = styled.div`
  grid-area: footer;
`;
```

