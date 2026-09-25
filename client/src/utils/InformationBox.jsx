function InformationBox({ typeData, nameData, icon: Icon, description, exampleData }) {
  return (
    <div className="flex flex-col justify-between p-4 h-52 w-80 border border-border-color rounded-md bg-surface-color/80 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col items-start">
          <h4 className="text-base font-bold text-text-primary">
            {typeData}
          </h4>
          <div className="text-xs font-sans text-text-secondary mt-0.5">
            {nameData}
          </div>
        </div>
        {Icon && <Icon className="text-lg text-text-secondary shrink-0 mt-1" />}
      </div>

      <div className="text-xs text-text-secondary leading-relaxed my-2">
        {description}
      </div>

      <div className="text-xl font-semibold text-accent-color pt-2 border-t border-border-color/50">
        {exampleData}
      </div>
    </div>
  );
}

export default InformationBox;
