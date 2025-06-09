function formatirajDatumEvropski(datumString: any) {
    const datum = new Date(datumString);
    if (isNaN(datum.getTime())) {
        return "Nevažeći datum";
    }
    return datum.toLocaleDateString('sr-RS');
}