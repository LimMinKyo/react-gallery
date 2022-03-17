import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsXSquareFill,
} from 'react-icons/bs';
import { useEffect, useRef } from 'react';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  border-bottom: 1px solid #aaa;
`;

const CloseBtn = styled.button`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    color: #aaa;
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
  }
`;

const Main = styled.main`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SlidePrevBtn = styled.button`
  position: absolute;
  left: 10px;
  z-index: 1;
  cursor: pointer;
  svg {
    color: whitesmoke;
    width: 40px;
    height: 40px;
  }
`;

const SlideNextBtn = styled.button`
  position: absolute;
  right: 10px;
  cursor: pointer;
  svg {
    color: whitesmoke;
    width: 40px;
    height: 40px;
  }
`;

const SlideWrap = styled.div`
  width: 100vw;
  overflow: hidden;
`;

const SlideUl = styled.ul<{ data: any }>`
  width: ${(props) => props.data.renderings.length}00vw;
  height: 80vh;
  display: flex;
`;

const PictureLi = styled.li`
  width: 100vw;
  height: 80vh;
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 80vh;
`;

interface IState {
  state: {
    idx: number;
  };
}

interface SlideProps {
  data: {
    renderings: {
      _id: string;
    }[];
  };
}

function Slide({ data }: SlideProps) {
  const { state } = useLocation() as IState;

  const IMAGE_WIDTH = 100;
  let currentPosition = 0;
  let position = 0;
  const SlideUlRef = useRef<any>(null);

  useEffect(() => {
    position -= state.idx * IMAGE_WIDTH;
    SlideUlRef.current.style.transform = `translateX(${position}vw)`;
    currentPosition += state.idx;
  }, []);

  const prev = () => {
    if (currentPosition > 0) {
      position += IMAGE_WIDTH;
      SlideUlRef.current.style.transform = `translateX(${position}vw)`;
      currentPosition = currentPosition - 1;
    }
  };

  const next = () => {
    if (currentPosition < data.renderings.length - 1) {
      position -= IMAGE_WIDTH;
      SlideUlRef.current.style.transform = `translateX(${position}vw)`;
      currentPosition = currentPosition + 1;
    }
  };

  return (
    <Container>
      <Header>
        <Link to="/">
          <CloseBtn>
            <BsXSquareFill />
          </CloseBtn>
        </Link>
      </Header>
      <Main>
        <SlidePrevBtn onClick={prev}>
          <BsFillArrowLeftSquareFill />
        </SlidePrevBtn>
        <SlideWrap>
          <SlideUl ref={SlideUlRef} data={data}>
            {data?.renderings.map((picture, index) => (
              <PictureLi key={index}>
                <Picture src={picture._id} />
              </PictureLi>
            ))}
          </SlideUl>
        </SlideWrap>
        <SlideNextBtn onClick={next}>
          <BsFillArrowRightSquareFill />
        </SlideNextBtn>
      </Main>
    </Container>
  );
}

export default Slide;
