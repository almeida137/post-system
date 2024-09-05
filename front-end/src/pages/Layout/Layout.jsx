import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MenuList from "./components/MenuList";
import './Layout.css';
import Orders from '../Orders/Orders'
import LogoP from "./components/Logo";
import Production from "../Production/Production";
import Plates from "../Plates/Plates";
import Borders from "../Borders/Borders";
import Colors from "../Colors/Colors";

const { Header, Sider, Footer, Content } = Layout;

const LayoutComponent = () => {
  // Autenticação
  const { signout } = useAuth();
  const navigate = useNavigate();
  // Dropdown
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        <Sider
        className="sidebar"
        theme="light"
        collapsed={collapsed}
        collapsible
        trigger={null}
      >
        {<LogoP />}
        <MenuList navigate={navigate} />
      </Sider>
        <Layout>

          <Header
            className="header"
            style={{
              padding: 0,
            }}
          >
            <Button
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <Button className="exit" onClick={() => [signout(), navigate("/")]}>
              Sair
            </Button>
          </Header>
          <Content
            style={{
              padding: '5px',
              margin: 0,
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <Routes>
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/orders" element={<Orders/>} />
              <Route path="/production" element={<Production/>} />
              <Route path="/cadastro-chapas" element={<Plates/>}/>
              <Route path="/cadastro-bordas" element={<Borders/>}/>
              <Route path="/cadastro-cores" element={<Colors/>}/>
              <Route path="/" element={<Orders/>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;
