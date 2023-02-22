import { useOutletContext } from "react-router-dom";
import { PriceData } from "./Coin";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
`;
const Box = styled.div`
  height: 50px;
  background-color: ${(props) => props.theme.cardBgColor};
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    width: 50%;
    text-align: center;
    font-size: 20px;
  }
  span:last-child {
    font-weight: 600;
  }
`;
const PricePercent = styled.span<{ Percent: number }>`
  color: ${(props) => (props.Percent >= 0 ? "red" : "#6c5ce7")};
`;

interface Iticker {
  tickersData: PriceData;
}

function Price() {
  const { tickersData } = useOutletContext<Iticker>();
  console.log(tickersData);
  const oneDay = +tickersData.quotes.USD?.percent_change_24h;
  const oneWeek = +tickersData.quotes.USD?.percent_change_7d;
  const oneMonth = +tickersData.quotes.USD?.percent_change_30d;
  const oneYear = +tickersData.quotes.USD?.percent_change_1y;

  return (
    <Container>
      <Box>
        <span>1 day ago</span>
        <PricePercent Percent={oneDay}>{oneDay}%</PricePercent>
      </Box>
      <Box>
        <span>1 week ago</span>
        <PricePercent Percent={oneWeek}>{oneWeek}%</PricePercent>
      </Box>
      <Box>
        <span>1 month ago</span>
        <PricePercent Percent={oneMonth}>{oneMonth}%</PricePercent>
      </Box>
      <Box>
        <span>1 year ago</span>
        <PricePercent Percent={oneYear}>{oneYear}%</PricePercent>
      </Box>
    </Container>
  );
}

export default Price;
