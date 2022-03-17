import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsXSquareFill, BsChevronDown } from 'react-icons/bs';

const Header = styled.header`
  height: 5vh;
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.pointColor};
`;

const CloseBtn = styled.button`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    color: ${(props) => props.theme.pointColor};
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
  }
  span {
    font-size: 12px;
  }
`;

const Main = styled.main`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: ${(props) => props.theme.pointColor};
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 5px;
  border: 1px solid ${(props) => props.theme.pointColor};
  border-radius: 3px;
  &:first-child {
    margin-right: 10px;
  }
  span {
    font-size: 14px;
    line-height: 14px;
    color: black;
    margin-right: 2rem;
  }
`;

const GalleryWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
  a {
    display: block;
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
  }
`;

const Picture = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-height: 200px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  @media screen and (max-width: 1080px) {
    height: 150px;
    max-height: 150px;
  }
`;

interface HomeProps {
  data: {
    renderings: {
      _id: string;
    }[];
  };
}

function Home({ data }: HomeProps) {
  return (
    <>
      <Header>
        <CloseBtn>
          <BsXSquareFill />
          <span>닫기</span>
        </CloseBtn>
      </Header>
      <Main>
        <InnerHeader>
          <span>{data.renderings.length}개의 렌더샷</span>
          <Title>갤러리</Title>
          <SelectWrap>
            <Select>
              <span>모든 렌더샷</span>
              <BsChevronDown />
            </Select>
            <Select>
              <span>모든 화질</span>
              <BsChevronDown />
            </Select>
          </SelectWrap>
        </InnerHeader>
        <GalleryWrap>
          {data?.renderings.map((picture, index) => (
            <Link key={index} to="/slide" state={{ idx: index }}>
              <Picture src={picture._id} />
            </Link>
          ))}
        </GalleryWrap>
      </Main>
    </>
  );
}

export default Home;
