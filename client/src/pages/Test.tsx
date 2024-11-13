import React from "react";

const Test: React.FC = () => {
  return (
    <div>
      <p>This is a page which is authorized for logged in users only.</p>
      <p>You should not see it if you are not logged in.</p>
    </div>
  );
};

export default Test;