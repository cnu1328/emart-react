import { Tabs } from "antd";
import { styled } from "styled-components";


export const TabsHeader = styled(Tabs)`
  overflow-x: auto;
  width: calc(100vw - 344px);
  .ant-tabs-nav {
    border: 1px solid #C8D0D6;
    padding-right: 8px;
    padding-left: 8px;
    margin-top: 16px;
    border-radius: 8px;
  }

  .ant-tabs .ant-tabs-tab+.ant-tabs-tab {
    margin-left: 0;
  }
`