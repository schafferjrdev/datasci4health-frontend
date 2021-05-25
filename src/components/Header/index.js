import "./style.scss";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, GithubFlag } from "components";

const Header = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState();

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  history.listen((location) => {
    setCurrentPage(location.pathname);
  });

  useEffect(() => {
    setCurrentPage(history.location.pathname);
  }, [history]);

  return (
    <header>
      <span className="header-title">Ciência de Dados na Saúde</span>

      <Menu className="header-menu" currentPage={currentPage} />
      <GithubFlag desktop />

      <MenuOutlined className="mobile-menu-button" onClick={showDrawer} />
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu
          className="drawer-menu"
          onClick={onClose}
          currentPage={currentPage}
        />

        <GithubFlag />
      </Drawer>
    </header>
  );
};

export default Header;
