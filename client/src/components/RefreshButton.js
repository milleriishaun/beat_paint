import PropTypes from "prop-types";
import React from "react";

const RefreshButton = React.memo(({ cb }) => {
  console.log("hello from RefreshButton");
  return (
    <button className="button-refresh-colors" onClick={() => cb()}>
      &#8634; &#9639;
    </button>
  );
});

export default RefreshButton;

RefreshButton.propTypes = {
  cb: PropTypes.func.isRequired
};
