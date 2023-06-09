import React from "react";
import Card from "../atoms/card";
import Button from "../atoms/button";
import styled from "styled-components";

interface ItemProps {
  size?: "small" | "medium" | "large";
  deleteItem: () => void;
  moveUpItem?: () => void;
  moveDownItem?: () => void;
  children: React.ReactNode;
}

export default function Item({
  children,
  deleteItem,
  moveUpItem,
  moveDownItem,
}: ItemProps) {
  return (
    <Card isFullWidth={false}>
      <FlexContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
        <ControlsContainer>
          <Button color="transparent" size="small" onClick={() => deleteItem()}>
            X
          </Button>
          <FlexColumnContainer>
            {moveUpItem ? (
              <Button
                color="secondary"
                size="small"
                onClick={() => moveUpItem()}
              >
                위로
              </Button>
            ) : (
              <Button color="secondary" size="small" disabled={true}>
                위로
              </Button>
            )}
            {moveDownItem ? (
              <Button
                color="secondary"
                size="small"
                onClick={() => moveDownItem()}
              >
                아래
              </Button>
            ) : (
              <Button color="secondary" size="small" disabled={true}>
                아래
              </Button>
            )}
          </FlexColumnContainer>
        </ControlsContainer>
      </FlexContainer>
    </Card>
  );
}

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 40px;
  hight: 100%;
  justify-content: space-between;
`;

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 40px;
  gap: 4px;
  hight: 100%:
  margin: 4px
`;
