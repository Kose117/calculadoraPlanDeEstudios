// const correctamente = Swal.mixin({
//     toast: true,
//     position: 'bottom',
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.addEventListener('mouseenter', Swal.stopTimer)
//       toast.addEventListener('mouseleave', Swal.resumeTimer)
//     }
//   })
  
//   correctamente.fire({
//     icon: 'success',
//     title: 'Se agregó correctamente'
//   })

const error=Swal.fire({
    icon: 'warning',
    title: '¡Agregue un semestre valido!',
    confirmButtonText: 'Solo numeros :)',
    buttonsStyling:false,
    customClass: {
        popup: 'error',
        confirmButton: 'confirm-error',
        icon: 'icon-error',
        title:'title-error',

}})