import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import styles from "./Breadcrumb.module.scss";
import { translate } from "common/methods/translations";

class Breadcrumbs extends Component {
  render() {
    const { elements } = this.props;
    return (
      <div className={styles.Breadcrumb}>
        <Breadcrumb tag="nav">
          {elements &&
            elements.map((element, index) => {
              return (
                <BreadcrumbItem
                  key={index}
                  href={element.href}
                  active={element.isActive}
                  tag={element.isActive ? "span" : "a"}
                >
                  {translate(`globals.menu.${element.name}`)}
                </BreadcrumbItem>
              );
            })}
        </Breadcrumb>
      </div>
    );
  }
}

export default Breadcrumbs;
