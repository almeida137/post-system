import { AreaChartOutlined, DropboxOutlined, BgColorsOutlined, CodepenOutlined, EditOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import useAuth from "../../../hooks/useAuth";
const MenuList = ({ navigate }) => {
  const user = useAuth()
  const onMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu mode="inline" className="menu-bar" onClick={onMenuClick}> 
      {/* <Menu.Item key="/dashboard" icon={<AreaChartOutlined />}>Dashboard</Menu.Item> */}
      <Menu.Item key="/orders" icon={<EditOutlined />}>Solicitações</Menu.Item>
      {user?.userType === "Administrador" &&<Menu.Item key="/production" icon={<SettingOutlined />}>Produção</Menu.Item>}

      {/* <Menu.Item key="/company" icon={<StoreIcon />}>Empresa</Menu.Item> */}
      {/* <Menu.Item key="/usuarios" icon={<TeamOutlined />}>Usuários</Menu.Item> */}
      {user?.userType === "Administrador" &&
      <Menu.SubMenu key="sub-cadastro" icon={<EditOutlined />} title="Cadastro">
        <Menu.Item key="/cadastro-chapas" icon={<CodepenOutlined />} >Chapas</Menu.Item>
        <Menu.Item key="/cadastro-bordas" icon={<CodepenOutlined />} >Bordas</Menu.Item>
        <Menu.Item key="/cadastro-cores" icon={<BgColorsOutlined />} >Cores</Menu.Item>
        {/* <Menu.Item key="/relat-caixa">Caixa</Menu.Item>
        <Menu.Item key="/relat-estoque">Estoque</Menu.Item>
        <Menu.Item key="/relat-rotatividade">Rotatividade</Menu.Item> */}
      </Menu.SubMenu>
      }
      {/* <Menu.Item key="/configuracao" icon={<SettingOutlined />}>Configuração</Menu.Item> */}
    </Menu>
  );
};

export default MenuList;
