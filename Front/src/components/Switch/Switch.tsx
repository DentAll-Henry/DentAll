import React from 'react';
import styles from "./Switch.module.css"; // Importa los estilos correctamente

interface SwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div 
      className={`${styles.switch} ${isOn ? styles.switchOn : styles.switchOff}`} 
      onClick={onToggle}
    >
      <div className={styles.switchHandle} />
    </div>
  );
};

export default Switch;
