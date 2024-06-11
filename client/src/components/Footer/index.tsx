import React from "react";
import {List, ListTitle, ListItem} from "@components/Footer/List";
import classes from "./styles.module.scss";


function Footer() {

  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer_top}>
          <div>
            <p className={classes.logo}>
              Green
              <span>Book</span>
            </p>

            <p className={classes.description}>
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue nec.
            </p>
            <div className={classes.contacts}>
              <p className={classes.contact}>(219) 555-0114</p>
              <p className={classes.dividing}>or</p>
              <p className={classes.contact}>Proxy@gmail.com</p>
            </div>
          </div>

          <List>
            <ListTitle>My Account</ListTitle>
            <ListItem>My Account</ListItem>
            <ListItem>Order History</ListItem>
            <ListItem>Shopping Cart</ListItem>
            <ListItem>Wishlist</ListItem>
          </List>

          <List>
            <ListTitle>Helps</ListTitle>
            <ListItem>Contact</ListItem>
            <ListItem>Faqs</ListItem>
            <ListItem>Terms & Condition</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </List>

          <List>
            <ListTitle>Proxy</ListTitle>
            <ListItem>About</ListItem>
            <ListItem>Shop</ListItem>
            <ListItem>Product</ListItem>
            <ListItem>Track Order</ListItem>
          </List>
        </div>

        <div className={classes.footer_bottom}>
          <p className={classes.copyright}>GreenBook eCommerce © 2024. All Rights Reserved</p>
        </div>

      </div>
    </footer>
  );
}


export default Footer;