import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}

// .d.ts를 타입선언파일이라고 한다. TS코드의 타입 추론을 돕는 파일이다.
// 첫번째 단계는 styled.d.ts 라는 테마에 사용될 변수들의 타입들을 선언하는 파일을 만드는 것이다.

//  DefaultTheme 라는 이름의 인터페이스를 생성해 타입을 명시해놓는다
// 테마를 작성할 때 import하여 테마안에 선언된 타입에 맞게 스타일을 작성해주면 된다.
