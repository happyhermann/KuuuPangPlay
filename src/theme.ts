import { DefaultTheme } from "styled-components";

// 테마를 작성할 때 import하여 테마안에 선언된 타입에 맞게 스타일을 작성해주면 된다.

export const theme: DefaultTheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
};
