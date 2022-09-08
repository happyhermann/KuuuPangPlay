import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 99;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 10px 30px;
  color: white;
  background-image: linear-gradient(0deg, transparent, #000 100px);
  height: 70px;
  transition-property: background-color, background-image;
  transition-duration: 0.3s;
  transition-timing-function: linear;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;

const Logo = styled.div`
  margin-right: 35px;
  width: 65px;
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  font-size: 18px;
  font-weight: 500;
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    width: 80px;
    height: 25px;
  }
`;

const Profile = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    i {
      transform: rotateX(-180deg);
    }
  }
  .profile_box {
    padding: 2px 5px;
    border: 2px solid white;
    border-radius: 90px;
    margin-right: 1px;
  }
  .profile {
    font-size: 20px;
    font-weight: 200;
    color: white;
  }
  .profile_arrow {
    font-size: 25px;
    height: 28px;
    font-weight: 500;
  }
`;

const Bar = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-bottom: 1px solid red;
  background-color: white;
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  //변화가 시작되는 위치를 뜻함 (오른쪽에서 중앙으로))
  position: absolute;
  left: -150px;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

interface IForm {
  keyword: string;
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const { scrollY } = useScroll();

  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const codingMatch = useMatch("/coding");
  const sportsMatch = useMatch("/sports");
  const myMatch = useMatch("/mylist");
  const newsMatch = useMatch("/news");

  console.log(homeMatch, tvMatch);

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
    // 코드로 부터 애니메이션을 동작시키는 방법 (기존 방식 component props)
    // 여러가지 동작을 하기 용이
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="https://assets.coupangplay.com/images/logo.png"
            className="Logo"
            alt="Coupang Play"
          />
        </Logo>

        <Items>
          <Item>
            <Link to="/">
              영화
              {homeMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              TV
              {tvMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/sports">
              스포츠
              {sportsMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/coding">
              코딩
              {codingMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/news">
              뉴스
              {newsMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/mylist">
              찜한 콘텐츠
              {myMatch && <Bar layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "60px",
        }}
      >
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            transition={{ type: "linear" }}
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            // animate={{ scaleX: searchOpen ? 1 : 0 }}
            placeholder="Search for movie or TV Show"
          />
        </Search>
        <Profile>
          <div className="profile_box">
            <i className="ri-user-line profile"></i>
          </div>
          <i className="ri-arrow-down-s-line profile_arrow"></i>
        </Profile>
      </Col>
    </Nav>
  );
}
