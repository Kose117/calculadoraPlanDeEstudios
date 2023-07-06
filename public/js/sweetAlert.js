export const correctamente = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


export const error_alerta = (msg, ) => {
    Swal.fire({
        icon: 'warning',
        title: msg,
        confirmButtonText: 'aceptar',
        buttonsStyling: false,
        customClass: {
            popup: 'error',
            confirmButton: 'confirm-error',
            icon: 'icon-error',
            title:'title-error',
        }
    });
}