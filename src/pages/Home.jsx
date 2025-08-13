import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const newId = uuidv4();
    navigate(`/canvas/${newId}`);
  }, [navigate]);

  return null; 
}
