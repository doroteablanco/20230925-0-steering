datalogger.onLogFull(function () {
    log_indicator = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    timeanddate.set24HourTime(0, 0, 0)
    log_indicator = true
    radio.sendValue(log_control, 1)
    datalogger.log(
    datalogger.createCV("Time", timeanddate.dateTime()),
    datalogger.createCV("Steering", 123.123)
    )
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    log_indicator = false
    radio.sendValue(log_control, 2)
    datalogger.log(
    datalogger.createCV("Time", timeanddate.dateTime()),
    datalogger.createCV("Steering", 321.321)
    )
    basic.showIcon(IconNames.No)
})
let steering_value = 0
let log_control = ""
let log_indicator = false
radio.setGroup(21)
log_indicator = false
let display = grove.createDisplay(DigitalPin.P0, DigitalPin.P0)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
datalogger.setColumnTitles(
"Time",
"Steering"
)
basic.showIcon(IconNames.Heart)
loops.everyInterval(500, function () {
    steering_value = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    180
    )
    if (log_indicator == true) {
        let angle_signal = ""
        radio.sendValue(angle_signal, steering_value)
        datalogger.log(
        datalogger.createCV("Time", timeanddate.dateTime()),
        datalogger.createCV("Steering", steering_value)
        )
        led.toggle(4, 4)
    }
    display.show(steering_value)
})
basic.forever(function () {
	
})
